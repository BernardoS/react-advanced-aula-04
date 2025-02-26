import { render,screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { beforeEach, expect } from "vitest";

const mockAxios = new MockAdapter(axios);

describe("App",() =>{
    
    beforeEach(()=>{
        mockAxios.reset();
    })

    it("Should render the component", ()=>{
        render(<App/>);
        expect(screen.getByText('Cadastro')).toBeInTheDocument(true)
    });

    it("Simulates invalid form submition", async()=>{
        render(<App/>);
        
        const nameInput = screen.getByLabelText('Nome');
        const submitButton = screen.getByRole('button',{name:/enviar/i});
        
        await userEvent.type(nameInput,'John Wick');
        await userEvent.click(submitButton);

        expect(screen.getByText('Por favor, informe seu e-mail')).toBeInTheDocument();
    });

    it("validates invalid email field", async () => {
        render(<App/>);
        
        const nameInput = screen.getByLabelText('Nome');
        const emailInput = screen.getByLabelText('E-mail');
        const submitButton = screen.getByRole('button',{name:/enviar/i});
        
        await userEvent.type(nameInput,'John Wick');
        await userEvent.type(emailInput,'Não mexe com o meu cachorro');
        await userEvent.click(submitButton);

        expect(screen.getByText('Por favor, informe um e-mail válido')).toBeInTheDocument();
    });

    it("should submit a valid form", async () => {
        render(<App/>);
        
        mockAxios.onPost('http://localhost:3000/users').reply(200);

        const nameInput = screen.getByLabelText('Nome');
        const emailInput = screen.getByLabelText('E-mail');
        const passwordInput = screen.getByLabelText('Senha');
        const confirmPasswordInput = screen.getByLabelText('Confirme sua senha');
        const submitButton = screen.getByRole('button',{name:/enviar/i});
        
        await userEvent.type(nameInput,'John Wick');
        await userEvent.type(emailInput,'john@wick.com');
        await userEvent.type(passwordInput,'teste123');
        await userEvent.type(confirmPasswordInput,'teste123');

        await userEvent.click(submitButton);

        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history[0].url).toBe('http://localhost:3000/users');
    });
});