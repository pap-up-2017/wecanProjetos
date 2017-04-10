package projeto.business;

import projeto.dao.UsuarioDao;
import projeto.entity.Login;
import projeto.entity.Usuario;
import projeto.entity.UsuarioLogado;
import projeto.util.Criptografia;

public class UsuarioBusiness {
	
	public String create(Usuario u){
		Usuario uTestUsername;
		UsuarioDao uDao = new UsuarioDao();
		try{
			uTestUsername = uDao.getObjByUsername(u.getUsernameUsuario());
		}catch(Exception ex){
			uTestUsername = null;
		}
		if(uTestUsername != null){
			return "Username duplicado";
		}
		else{
			uDao.salvar(u);
			return "salvo com sucesso!";
		}
	}
	
	public UsuarioLogado login (Login loginWeb){
	
		UsuarioDao uDao = new UsuarioDao();
		Usuario usuarioBanco;
		
		// Puxa usuario do banco via username 
		try {
			usuarioBanco = uDao.getObjByUsername(loginWeb.getUsernameLogin());
		}
		catch (Exception ex) {
			usuarioBanco = null;
		}

		if(usuarioBanco != null){
			// criptografa senha informado pelo usuário no login
			String senhaCrip = Criptografia.criptografar(loginWeb.getSenhaUsername());
			if(senhaCrip.equals(usuarioBanco.getSenhaUsuario())){
				// retorna id do usuario encontrado
				System.out.println("Usuario logado: "+ usuarioBanco.getNomeUsuario());
				UsuarioLogadoBusiness LogBusiness = new UsuarioLogadoBusiness();
				UsuarioLogado LoggedUser = LogBusiness.create(usuarioBanco);
				return LoggedUser;
				}
		}
		return null;		
	}
	
	
}
