import './App.css'


function Winner() {

  const reset = () => {
    window.location.reload(false);
  } 
 
  return (
    <div className='winner-tab'>
      <div className='winner-info'>
        <h2>You won the game!!!Congrats!!!</h2>
        <button onClick={reset}>Reset the game</button>
      </div>
     
    </div>
  );
}

export default Winner;
