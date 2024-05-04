import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const signup = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username"/>
              <TextInput
                type="text"
                placeholder="username"
                id="username"
              />
            </div>
            <div>
              <Label value="Your Email"/>
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your Password"/>
              <TextInput
                type="password"
                placeholder="password"
                id="password"
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
            Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signup' className="text-blue-500 ml-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
