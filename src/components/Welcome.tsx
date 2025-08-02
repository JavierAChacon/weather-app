const Welcome = () => {
  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center text-white'>
      <h1 className='text-3xl font-bold tracking-wide sm:text-4xl'>Weather App</h1>
      <p className='mt-4 max-w-md text-slate-300 sm:text-lg'>
        Search for a city using the bar above to see the current weather and upcoming forecast.
      </p>
    </div>
  )
}

export default Welcome
