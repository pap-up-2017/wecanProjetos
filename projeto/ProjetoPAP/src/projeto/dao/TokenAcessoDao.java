package projeto.dao;

import projeto.entity.TokenAcesso;
import projeto.entity.Usuario;

public class TokenAcessoDao {
	
	public TokenAcesso criarToken(Usuario user){
		TokenAcesso token = new TokenAcesso();
		
		if(user != null){
			token.setIdUserLogged(user.getIdUsuario());
			token.setTypeUserLogged(user.getTipoUsuario().getTipoUsuario());
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
