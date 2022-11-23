import { useState } from 'react';

const validationFields = {
  binary: {
    error: false,
    msg: ''
  }
}

function FormField({ validation, feild, children }) {

  const { error, msg } = validation[feild];

  return (<div>
    {children}
    {error && <p className='text-red-600'>{msg}</p>}
  </div>)

}

function App() {

  const [validation, setValidation] = useState(validationFields);
  const [decimal, setdecimalNumber] = useState('');
  
  // binary to decimal convert
  const binaryToDecimal = (number) => {

    // convert string to array
    let numberArray = number.split("");
    let tempNum = 0;

    for (let i in numberArray.reverse()) {

      let num = numberArray[i];
      tempNum += Math.pow(2, i) * num;
    }

    setdecimalNumber(tempNum);
  }

  // get input value to convert decimal number
  const getInputData = (text) => {

    const patten = /\b[01]+\b/;
    const isValide = patten.test(text);

    if (!isValide) {

      validation.binary.error = true;
      validation.binary.msg = "Please insert binary number";
      setdecimalNumber('Converting Error');

    } else {

      validation.binary.error = false;
      validation.binary.msg = "";
      binaryToDecimal(text);

    }
    setValidation({ ...validation });
  }
  
  return (
    <>
      <nav className='bg-slate-100 p-5'>
        <h1 className='text-lg font-bold'>Binary To Decimal Converter</h1>
      </nav>
      <div className='container mx-auto '>
        <div className='sm:w-3/4 mt-5 mx-auto px-2'>
          <p className='font-bold text-xl text-center'>Binary To Decimal</p>
          <div className='mt-5 grid sm:grid-cols-2 '>
            <label>Binary Number (eg: 1101) </label>
            <FormField validation={validation} feild="binary">
              <input
                className='px-2 font-bold bg-slate-100 rounded text-right drop-shadow-md'
                placeholder='Binary Number'
                onChange={(e) => getInputData(e.target.value)}
              ></input>
            </FormField>
            <label>Decimal Number </label>
            <label className='font-bold text-xl'>{decimal} </label>
          </div>
        </div>
      </div>
      <footer className='w-full p-4 bg-slate-100 text-center fixed bottom-0'>
        <p className='text-cyan-900'>Created By ❤️ Git Portal</p>
      </footer>
    </>
  );
}

export default App;
