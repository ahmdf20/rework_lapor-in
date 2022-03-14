import { useState, useEffect } from 'react'
import Axios from 'axios'

const Home = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    setInterval(async () => {
      await Axios.get('http://localhost:5000/read').then((res) => setListUsers(res.data))
    }, 500);
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    await Axios.post('http://localhost:5000/register', { name: name, email: email }).then((res) => {
      console.log(res)
      alert('data saved successfully')
      setName('')
      setEmail('')
    }).catch((err) => console.log(err))
  }


  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-lg-4">
          <form action="">
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className='form-control' id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className='form-control' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type='submit' className="btn btn-md btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-8">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.map((users, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>
                      <a href="#" className='btn btn-sm btn-danger'>Hapus</a>
                      <a href="#" className='btn btn-sm btn-warning'>Edit</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
export default Home