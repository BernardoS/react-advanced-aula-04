import Container from './components/Container'
import GlobalStyles from './components/GlobalStyles'
import Heading from './components/Heading'
import Fieldset from './components/Fieldset'
import Label from './components/Label'
import Input from './components/Input'
import Button from './components/Button'
import Form from './components/Form'
import ErrorText from './components/ErrorText';
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'

const validationSchema = Yup.object({
  name: Yup.string()
  .required("Por favor, informe o seu nome !"),
  email: Yup.string()
  .email("Por favor, informe um e-mail válido")
  .required("Por favor, informe seu e-mail"),
  password: Yup.string()
  .min(8,"A senha deve possuir no mínimo 8 caracteres")
  .required("Por favor, informe uma senha para seu cadastro"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')],'As duas senhas não coincidem!')
  .required("Por favor, confirme sua senha")
})

function App() {

  const createUser = (values,{ resetForm }) =>{
    console.log('formulário submetido: ', values);

    const user = values;
    delete user.confirmPassword;

    axios.post('http://localhost:3000/users',user)
    .then(()=>{
      alert("Usuário cadastrado com sucesso");
      resetForm()
    })
    .catch((error)=>{
      console.error("Erro ao cadastrar usuário",error);
    });
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        <Heading>
          Cadastro
        </Heading>
        <Formik
          initialValues={{
            name:'',
            email:'',
            password:'',
            confirmPassword:''
          }}
          onSubmit={createUser}
          validationSchema={validationSchema}
          >        
          
          <Form>
            <Fieldset>
              <Label>
                Nome
              </Label>
              <Input name="name" id="name" />
              <ErrorMessage name='name' component={ErrorText}/>
            </Fieldset>
            <Fieldset>
              <Label>
                E-mail
              </Label>
              <Input name="email" type="email" id="email" />
              <ErrorMessage name='email' component={ErrorText}/>
            </Fieldset>
            <Fieldset>
              <Label>
                Senha
              </Label>
              <Input name="password" type="password" id="password"/>
              <ErrorMessage name='password' component={ErrorText}/>
            </Fieldset>
            <Fieldset>
              <Label>
                Confirme sua senha
              </Label>
              <Input name="confirmPassword" type="password" id="confirmPassword"/>
              <ErrorMessage name='confirmPassword' component={ErrorText}/>
            </Fieldset>
            <Button type='submit'>
              Enviar
            </Button>
          </Form>
        </Formik>
      </Container>
    </>
  )
}

export default App
