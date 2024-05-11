import { Button } from "flowbite-react"


const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">
                Want to learn more about Nextjs?
            </h2>
            <p className="text-gray-500 my-2">
                Checkout this resources with 100 Nextjs projects!
            </p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href="https://olibr.com/blog/best-beginner-friendly-next-js-projects-with-code/" target="_blank" rel="noopener noreferrer">Learn More</a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"/>
        </div>
    </div>
  )
}

export default CallToAction