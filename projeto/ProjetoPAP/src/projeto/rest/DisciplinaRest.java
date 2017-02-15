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
import projeto.entity.Disciplina;

@Path("/disciplinarest")
public class DisciplinaRest {

	// get para puxar todos as disciplinas do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Disciplina> listarDisciplina() {
		InterfaceDao<Disciplina> dao = FactoryDao.createDisciplinaDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova disciplina.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarDisciplina(Disciplina disciplina) {	
		InterfaceDao<Disciplina> dao = FactoryDao.createDisciplinaDao();
		if (disciplina.getIdDisciplina() < 1){
			dao.salvar(disciplina);		
		}
	}
	
	// post para alterar uma disciplina no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarDisciplina(Disciplina disciplina) {
		InterfaceDao<Disciplina> dao = FactoryDao.createDisciplinaDao();
		if (disciplina.getIdDisciplina() > 0){
			dao.alterar(disciplina);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarDisciplina(Disciplina disciplina) {
		InterfaceDao<Disciplina> dao = FactoryDao.createDisciplinaDao();
		if (disciplina.getIdDisciplina() > 0){
			dao.excluir(disciplina);
		}
	}
}
