package projeto.test;

import org.junit.Test;

import projeto.dao.LoginDao;
import projeto.entity.Login;

public class TestLogin {
	
	@Test
	public void validaLogin(){
		Login log = new Login();
		log.setUsernameLogin("testeUsuario");
		log.setSenhaUsername("teste1234");
		
		LoginDao logDao = new LoginDao();
		
		int resultadoLogin = logDao.verificaLogin(log);
		if(resultadoLogin > 1 ){
			System.out.println("Login confirmado, id = " +resultadoLogin);
		}
		else{
			System.out.println("login incorreto");
		}
	}

}
