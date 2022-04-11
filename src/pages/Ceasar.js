import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';

const Ceasar  = () => {
  const [msg, setMsg] = useState("");
  const [num, setNum] = useState(1);
  const [result, setResult] = useState("");
  const [lang, setLang] = useState('en');
  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const enAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ruAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  const numbers = "0123456789";

  const contain = (lang, enAlphabet, ruAlphabet) => {
    if (lang === 'en') {
      return enAlphabet
    } else {
      return ruAlphabet;
    }
  }

  const containNumber = (char, number, encryption) => {

    if (encryption === 'encrypt') {
      let index = numbers.indexOf(char) + parseInt(number);
      if (index > 9) {
        index -= 9 + 1;
      }
      return numbers[index];
    } else {
      let index = numbers.indexOf(char) - parseInt(number);
      if (index < 0) {
        index += 9 + 1;
      }
      return numbers[index];
    }
  }

  const onEncryption = (e) => {
    const { name } = e.target;
    let newStr = '';
    if (!msg || !num) return;

    const message = msg.replace(/[^\sa-zа-яё0-9]/gi, '');

    for (let i = 0; i < message.length; i++) {
      let index =
        name === 'encrypt' ? contain(lang, enAlphabet, ruAlphabet).indexOf(message[i].toUpperCase()) + parseInt(num)
          : contain(lang, enAlphabet, ruAlphabet).indexOf(result[i].toUpperCase()) - parseInt(num);

      let isUpperCase = false;

      isUpperCase = message[i] === message[i].toUpperCase() && true;

      if (name === 'encrypt' ? (lang === 'en' ? index > 25 : index > 32)  : index <= 0) {
        name === 'encrypt' ? (lang === 'en' ? index -= 25 + 1 : index -= 32 + 1) : (lang === 'en' ? index += 25 + 1 : index += 33 + 1);
      }

      newStr +=
        (!isNaN(message[i]) && message[i] !== ' ') ? (name !== 'decrypt' ? containNumber(message[i], num, name) : containNumber(result[i], num, name)) : message[i] === ' ' ? ' ' : (isUpperCase ? contain(lang, enAlphabet, ruAlphabet)[index] : contain(lang, enAlphabet, ruAlphabet)[index].toLowerCase()) ;
    }
    setResult(newStr);
  }

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Language</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={lang}
            onChange={handleChange}
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel value="en" control={<Radio />} label="EN" />
            <FormControlLabel value="ru" control={<Radio />} label="RU" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField
        id="outlined-name"
        label="Enter msg"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      </Box>

      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Enter num"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            variant="outlined"
            name="encrypt"
            onClick={onEncryption}>
            ENCRYPT</Button>

          <Button
            variant="outlined"
            name="decrypt"
            disabled={!result}
            onClick={onEncryption}
          >DECRYPT</Button>
        </ButtonGroup>
      </Box>

      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Result"
          readOnly="readOnly"
          value={result}
        />
      </Box>

      {/* <Divider /> */}
    </>
  )
}

export default Ceasar;