
import GetOfferData from './component/CountDownFeature/GetOfferData';
import OfferSetup from './component/CountDownFeature/OfferSetup';
import ShowCountdown from './component/CountDownFeature/ShowCountWodn';
import HomeData from './component/HomeData';
import NewFrom from './component/NewFrom';
import TestOne from './component/TestOne';
import UpdatedFrom from './component/UpdatedFrom';

function App() {

  return (
    <>
      <div className='w-[700px] mx-auto'>
        <h2 className='text-3xl text-center'>Testing and intregation multer</h2>
        
        <div>
       {/* <HomeData></HomeData> */}
       <div className='mt-10'>
        {/* <NewFrom></NewFrom> */}
        <UpdatedFrom></UpdatedFrom>
        {/* <TestOne></TestOne> */}
       </div>
          <div  className='mt-10 mb-10'>
            <OfferSetup></OfferSetup>
          </div>
          <div  className='mt-10 mb-10'>
          <h2 className='text-3xl text-center'>Testing countdown and set offer data</h2>
            {/* <ShowCountdown></ShowCountdown> */}
            <GetOfferData></GetOfferData>
            
          </div>
        </div>
      </div>


    </>
  )
}

export default App
