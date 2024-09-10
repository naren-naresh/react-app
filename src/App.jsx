import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobPage , {jobLoader}from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  // Add new Job
  const addJob = async(newJob) => {
    const resquest = await fetch('/api/jobs',{
      method:'POST',
      headers : {
        'Content-type':'application/json'
      },
      body:JSON.stringify(newJob)
    })
    
  }

  //Update job
  const updateJob = async (job) => {
    const resquest = await fetch(`/api/jobs/${job.id}`,{
      method:'PUT',
      headers : {
        'Content-type':'application/json'
      },
      body:JSON.stringify(job)
    })
  }

  // Delete new Job
  const deleteJob = async (id) => {
       console.log('delete',id);

       const resquest = await fetch(`/api/jobs/${id}`,{
        method:'DELETE', 
      })
       
  }
  
  // Routes 
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element = {<MainLayout />}>
      <Route index element ={<HomePage />}/>
      <Route path='/jobs' element ={<JobsPage />}/>  
      <Route path='/add-job' element ={<AddJobPage  addJobSubmit={addJob}/>}/>  
      <Route path='/edit-job/:id' element ={<EditJobPage  updateJobSubmit={updateJob}/>} loader = {jobLoader}/> 
      <Route path='/job/:id' element ={<JobPage deleteJob={deleteJob} />} loader = {jobLoader}/>
      <Route path='*' element ={<NotFoundPage />}/>
  
    </Route>
  ))

  return <RouterProvider router={router} />
}

export default App
