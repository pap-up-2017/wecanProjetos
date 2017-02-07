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
import projeto.entity.Curso;

@Path("/cursorest")
public class CursoRest {
	
	// get para puxar todas valores do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Curso> listarCursos() {
		InterfaceDao<Curso> dao = FactoryDao.createCursoDao();
		return dao.listar();	
	}
	
	// post para um novo cadastro
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarCurso(Curso curso) {	
		InterfaceDao<Curso> dao = FactoryDao.createCursoDao();
		if (curso.getIdCurso() < 1){
			dao.salvar(curso);		
		}
	}
	
	// post para uma nova alteração... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarCurso(Curso curso) {
		InterfaceDao<Curso> dao = FactoryDao.createCursoDao();
		if (curso.getIdCurso() > 0){
			dao.alterar(curso);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarCurso(Curso curso) {
		InterfaceDao<Curso> dao = FactoryDao.createCursoDao();
		if (curso.getIdCurso() > 0){
			dao.excluir(curso);
		}
	}

}
