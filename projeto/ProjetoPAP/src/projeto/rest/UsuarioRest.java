package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Cidade;
import projeto.entity.Usuario;

@Path("/usuariorest")
public class UsuarioRest {
	
	// get para puxar todas os dados no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Usuario> listarUsuarios() {
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		return dao.listar();	
	}
	
	// post para cadastro..
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarUsuario(Usuario usuario) {	
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		if (usuario.getIdUsuario() < 1){
			dao.salvar(usuario);		
		}
	}
	
	// post para alterar..
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarUsuario(Usuario usuario) {
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		if (usuario.getIdUsuario() > 0){
			dao.alterar(usuario);
		}
	}
	
	// post para excluir..
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarUsuario(Usuario usuario) {
		InterfaceDao<Usuario> dao = FactoryDao.createUsuarioDao();
		if (usuario.getIdUsuario() > 0){
			dao.excluir(usuario);
		}
	}

}
