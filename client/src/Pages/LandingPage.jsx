import { useNavigate } from "react-router-dom";
import LoginForm from "../components/users/LoginForm";

function LandingPage() {
  const navigate = useNavigate();
  return(
    <>
    <main>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
              ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

         
            <LoginForm />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <a className="underline" onClick={() => navigate('/signup')} >Sign up</a>
              </p>
            </div>
       
            </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Scenic background"
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        
      </section>

    </main>
    </>
  )
}

export default LandingPage;
