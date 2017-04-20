package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import projeto.business.UsuarioBusiness;
import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Usuario;
import projeto.util.Criptografia;

@Path("/usuariorest")
public class UsuarioRest {
	
	Gson gson = new Gson();
	
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
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public String cadastrarUsuario(Usuario usuario) {
		String result = "";
		UsuarioBusiness userBus = new UsuarioBusiness();
		if (usuario.getIdUsuario() < 1){
			result = userBus.create(usuario);
		}
		System.out.println(result);
		return gson.toJson(result);
	}
	
	// post para alterar..
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public String alterarUsuario(Usuario usuario) {
		String result = "";
		UsuarioBusiness userBus = new UsuarioBusiness();
		if (usuario.getIdUsuario() > 0){
			result = userBus.update(usuario);
		}
		System.out.println(result);
		return gson.toJson(result);
	}
	
	// post para excluir..
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel/{id}")
	public String deletarUsuario(@PathParam("id") String id){
		UsuarioBusiness userBus = new UsuarioBusiness();
		String result = userBus.delete(Integer.parseInt(id));
		return gson.toJson(result);
	}
	
	// post para pesquisa por id..
	@POST
	@Path("/busca/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Usuario buscarUsuario(@PathParam("id") String id) {
		UsuarioBusiness userBus = new UsuarioBusiness();
		Usuario usuario = userBus.buscaUsuarioId(Integer.parseInt(id));
		return usuario; 
	}
	
	// Criptografa senha
	@POST
	@Path("/cripSenha/{senha}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String criptografaSenha(@PathParam("senha") String senha) {
		return gson.toJson(Criptografia.criptografar(senha));
	}
}
