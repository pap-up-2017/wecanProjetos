package projeto.dao;

import projeto.entity.TokenAcesso;
import projeto.entity.Usuario;

public class TokenAcessoDao {
	
	public TokenAcesso criarToken(int id){
		TokenAcesso token = new TokenAcesso();
		
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		Usuario u = dao.getObjById(id);
		
		if(u != null){
			token.setIdUserLogged(u.getIdUsuario());
			token.setTypeUserLogged(u.getTipoUsuario().getTipoUsuario());
			return token;
		}	
		return null;
	}
	
	public TokenAcesso criarTokenSemUser(){
		TokenAcesso token = new TokenAcesso();
		token.setIdUserLogged(0);
		token.setTypeUserLogged("Não logado");
		return token;
	}

}
