package projeto.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.UsuarioBusiness;
import projeto.business.UsuarioLogadoBusiness;
import projeto.entity.Login;
import projeto.entity.UsuarioLogado;

@Path("/loginrest")
public class LoginRest {
	
	// post para verificação de login
	@POST
	@Path("/postlogin")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public UsuarioLogado validarLogin(Login login) {
		UsuarioBusiness userBusiness = new UsuarioBusiness();
		UsuarioLogado loggedUser =  userBusiness.login(login);
		return loggedUser;
	}
	
	// post para verificação de login
	@POST
	@Path("/renovarSession")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public UsuarioLogado renovarSession(UsuarioLogado usuarioLogado) {
		UsuarioLogadoBusiness loggedUserBusiness = new UsuarioLogadoBusiness();
		UsuarioLogado loggedUser =  loggedUserBusiness.renovarToken(usuarioLogado);
		return loggedUser;
	}
	
	// post para verificação de login
	@POST
	@Path("/validarSession")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean validarSession(UsuarioLogado usuarioLogado) {
		UsuarioLogadoBusiness loggedUserBusiness = new UsuarioLogadoBusiness();
		return loggedUserBusiness.verificarSession(usuarioLogado);
	}

}
