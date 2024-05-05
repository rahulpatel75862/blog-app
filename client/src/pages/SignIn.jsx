import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()})
  }

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      toast.error('Please fill all the details')
    }
    try{
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.sucess === false){
        toast.error(data.message);
      }
      if(res.ok){
        navigate('/')
        toast.success('Login Successfully');
      }
      setLoading(false)
    } 
    catch(error){
      console.log(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Rahul
            </span>
            Blog
          </Link>
          <p className="font-semibold text-sm mt-5">
            Words are the brushstrokes, thoughts are the colors. Let your blog
            be the canvas where imagination takes flight.
          </p>
        </div>
        <div className=" flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to="/signup" className="text-blue-500 ml-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
