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
import projeto.entity.Competencia;
import projeto.entity.Projeto;

@Path("/competenciarest")
public class CompetenciaRest {

	// get para puxar todos as competencias do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Competencia> listarCompetencia() {
		InterfaceDao<Competencia> dao = FactoryDao.createCompetenciaDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova Competencia.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarCompetencia(Competencia competencia) {	
		InterfaceDao<Competencia> dao = FactoryDao.createCompetenciaDao();
		if (competencia.getIdCompetencia() < 1){
			dao.salvar(competencia);		
		}
	}
	
	// post para alterar uma competencia no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarCompetencia(Competencia competencia) {
		InterfaceDao<Competencia> dao = FactoryDao.createCompetenciaDao();
		if (competencia.getIdCompetencia() > 0){
			dao.alterar(competencia);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarCompetencia(Competencia competencia) {
		InterfaceDao<Competencia> dao = FactoryDao.createCompetenciaDao();
		if (competencia.getIdCompetencia() > 0){
			dao.excluir(competencia);
		}
	}
}
