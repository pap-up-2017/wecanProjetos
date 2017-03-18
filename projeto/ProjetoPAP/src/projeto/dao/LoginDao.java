package projeto.dao;

import projeto.entity.Login;
import projeto.entity.Usuario;
import projeto.util.Criptografia;

public class LoginDao {
	
	public int verificaLogin(Login loginWebPage){
		UsuarioDao uDao = new UsuarioDao();
		// Puxa usuario do banco via username 
		Usuario usuarioBanco = uDao.getObjByUsername(loginWebPage.getUsernameLogin());
		if(usuarioBanco != null){
			if(usuarioBanco.getUsernameUsuario().equals(loginWebPage.getUsernameLogin())){
				// criptografa senha informado pelo usuário no login
				String senhaCrip = Criptografia.criptografar(loginWebPage.getSenhaUsername());
				if(senhaCrip.equals(usuarioBanco.getSenhaUsuario())){
					// retorna id do usuario encontrado
					System.out.println("Usuario logado: "+ usuarioBanco.getNomeUsuario());
					return usuarioBanco.getIdUsuario();
				}
			}
		}
		System.out.println("Usuario não encontrado.");
		return 0;
	}
}
