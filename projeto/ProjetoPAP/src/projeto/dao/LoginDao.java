package projeto.dao;

import projeto.entity.Login;
import projeto.entity.Usuario;
import projeto.util.Criptografia;

public class LoginDao {
	
	public Usuario verificaLogin(Login loginWebPage){
		UsuarioDao uDao = new UsuarioDao();
		Usuario usuarioBanco;
		
		// Puxa usuario do banco via username 
		try {
			usuarioBanco = uDao.getObjByUsername(loginWebPage.getUsernameLogin());
		}
		catch (Exception ex) {
			usuarioBanco = null;
		}

		if(usuarioBanco != null){
			if(usuarioBanco.getUsernameUsuario().equals(loginWebPage.getUsernameLogin())){
				// criptografa senha informado pelo usuário no login
				String senhaCrip = Criptografia.criptografar(loginWebPage.getSenhaUsername());
				if(senhaCrip.equals(usuarioBanco.getSenhaUsuario())){
					// retorna id do usuario encontrado
					System.out.println("Usuario logado: "+ usuarioBanco.getNomeUsuario());
					return usuarioBanco;
				}
				else{
					usuarioBanco = null;
				}
			}
			else{
				usuarioBanco = null;
			}
		}else{
			usuarioBanco = null;
		}
		return usuarioBanco;
	}
}
