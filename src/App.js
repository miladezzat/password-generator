import * as bcrypt from 'bcryptjs';
import { useState } from 'react';
import styles from './app.module.css'

function App() {
  const [key, setKey] = useState('');

  const [password, setPassword] = useState({
    bankPassword: '',
    facebookPassword: '',
    gmailPassword: '',
    laptopPassword: '',
    twitterPassword: '',
  });
  const [error, setError] = useState(' ');

  const salt = '$2a$10$CwTycUXWue0Thq9StjUM0u';

  const generatePassword = () => {

    if (key?.trim() === '') {
      setError('Key is Required');
      setTimeout(() => {
        setError(' ')
      }, 1000);
    } else {
      const bankHash = bcrypt.hashSync(`this is the ${key} of bank password`, salt);
      const facebookHash = bcrypt.hashSync(`this is the facebook's ${key}`, salt);
      const gmailHash = bcrypt.hashSync(`This is the gmail password ${key} password`, salt);
      const laptopHash = bcrypt.hashSync(`This is password key of the laptop  ${key}`, salt);
      const twitterHash = bcrypt.hashSync(`This is the twitter key ${key} password`, salt);

      setPassword({
        bankPassword: bankHash.slice(10, 34),
        facebookPassword: facebookHash.slice(9, 33),
        gmailPassword: gmailHash.slice(8, 32),
        laptopPassword: laptopHash.slice(11, 35),
        twitterPassword: twitterHash.slice(10, 34)
      });
    }
  }


  const handleOnChange = (e) => {
    setKey(e.target.value)
  }

  const copyPassword = async (e, value) => {
    e.target.style.padding = '2px';
    await navigator.clipboard.writeText(value);
    setTimeout(() => {
      e.target.style.padding = '0';
    }, 500);
  }

  return (
    <div className="container">
      <div className='row my-5 py-5'>
        <div className='col col-md-6 mx-auto border p-3'>
          <img src="./logo.png" className="rounded mx-auto d-block my-3" alt="logo"></img>
          <div className="mb-3">
            <input type="text" className="form-control" id="key" placeholder="enter your key" value={key} onChange={handleOnChange} />
            <p className='text-center text-danger'>{error}</p>
          </div>
          <div className="d-grid gap-2">
            <button className='btn btn-primary' type='button' onClick={generatePassword}>Generate Password</button>
          </div>
        </div>
      </div>
      {
        (password.bankPassword !== '') && (
          <div className='row'>
            <div className='col col-md-6 mx-auto'>
              <ul className="list-group">
                <li className="list-group-item">
                  <img className={`${styles.image} `} src='./bank.png' alt='bank' />
                  <span className={styles.span}> {password.bankPassword}</span>
                  <img className={`float-end ${styles.copy}`} src='./copy.png' alt='copy'
                    onClick={(e) => copyPassword(e, password.bankPassword)} />
                </li>

                <li className="list-group-item">
                  <img className={`${styles.image} `} src='./facebook.png' alt='bank' />
                  <span className={styles.span} > {password.facebookPassword}</span>
                  <img className={`float-end ${styles.copy}`} src='./copy.png' alt='copy'
                    onClick={(e) => copyPassword(e, password.facebookPassword)} />
                </li>

                <li className="list-group-item">
                  <img className={`${styles.image} `} src='./gmail.png' alt='bank' />
                  <span className={styles.span} > {password.gmailPassword}</span>
                  <img className={`float-end ${styles.copy}`} src='./copy.png' alt='copy'
                    onClick={(e) => copyPassword(e, password.gmailPassword)} />
                </li>

                <li className="list-group-item">
                  <img className={`${styles.image} `} src='./laptop.png' alt='bank' />
                  <span className={styles.span} > {password.laptopPassword}</span>
                  <img className={`float-end ${styles.copy}`} src='./copy.png' alt='copy'
                    onClick={(e) => copyPassword(e, password.laptopPassword)} />
                </li>

                <li className="list-group-item">
                  <img className={`${styles.image} `} src='./twitter.png' alt='bank' />
                  <span className={styles.span} > {password.twitterPassword}</span>
                  <img className={`float-end ${styles.copy}`} src='./copy.png' alt='copy'
                    onClick={(e) => copyPassword(e, password.twitterPassword)} />
                </li>
              </ul>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
