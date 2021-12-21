import './App.css'


function Winner() {

  const reset = () => {
    window.location.reload(false);
  } 
 
  return (
    <div className='winner-tab'>
      <div className='winner-info'>
        <h2>Игра окончена!!!</h2>
        <button onClick={reset}>Заново</button>
      </div>
     
    </div>
  );
}

export default Winner;
