import { useNavigate } from "react-router-dom";
import LoginForm from "../components/users/LoginForm";
import { useSelector } from "react-redux";

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  return(
    <>
      <section className="relative flex flex-wrap w-full lg:h-screen lg:items-center">
        <div className="w-full flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center my-7">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
              ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

            { !isAuthenticated ? (
            <div>
              <LoginForm />
            </div>
            ) : (
              <div>
                Welcome Costumer
              </div>
            )}
       
            </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Scenic background"
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        
    </section>
    </>
  )
}

export default LandingPage;
