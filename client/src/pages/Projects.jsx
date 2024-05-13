import CallToAction from '../components/CallToAction'

const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>
        Rahul's Blog was founded with a simple yet profound vision: to create a
        platform where individuals from all walks of life can find valuable
        information, inspiration, and solutions to their everyday challenges.
      </p>
      <CallToAction/>
    </div>
  );
};

export default Projects;
