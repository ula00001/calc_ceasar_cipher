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

const LikeEnigma = () => {
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const [result, setResult] = useState("");
  const [lang, setLang] = useState('en');
  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const enAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ruAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  // const msg2bers = "0123456789";

  const contain = (lang, enAlphabet, ruAlphabet) => {
    if (lang === 'en') {
      return enAlphabet
    } else {
      return ruAlphabet;
    }
  }

  const trimMsg = (msg) => {
    return msg.replace(/[^a-zа-яё]+/gi, '').trim()
  }

  const getIndex = (str) => {
    let index = []
    for (let i = 0; i < str.length; i++) {
      index.push((lang === 'en' ? enAlphabet : ruAlphabet).indexOf(str[i].toUpperCase()))
    }
    return index;
  }

  const onEncryption = (e) => {
    if (!msg || !msg2) return;

    if (trimMsg(msg).length > trimMsg(msg2).length) {
      lang === 'en' ?
        alert('The encrypting code must not be greater than the key')
        : alert('Код шифрования не должен быть больше ключа')
      return
    }

    const { name } = e.target;
    let newStr = '';
    const message1 = trimMsg(msg);
    const message2 = trimMsg(msg2);

    const msg1Ind = getIndex(message1);
    const msg2Ind = getIndex(message2);

    for (let i = 0; i < message1.length; i++) {
      let isUpperCase = false;
      isUpperCase = message1[i] === message1[i].toUpperCase() && true;

      newStr +=
         (isUpperCase ? (name === 'encrypt' ? contain(lang, enAlphabet, ruAlphabet)[msg2Ind[i]] : contain(lang, enAlphabet, ruAlphabet)[msg1Ind[i]]) : (name === 'encrypt' ? contain(lang, enAlphabet, ruAlphabet)[msg2Ind[i]].toLowerCase() : contain(lang, enAlphabet, ruAlphabet)[msg1Ind[i]]).toLowerCase()) ;

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
          label="Enter msg2"
          value={msg2}
          onChange={(e) => setMsg2(e.target.value)}
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
    </>
  )
}

export default LikeEnigma;