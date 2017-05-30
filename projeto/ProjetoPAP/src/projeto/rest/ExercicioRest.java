package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import projeto.dao.ExercicioDao;
import projeto.dao.FactoryDao;
import projeto.entity.Exercicio;


@Path("/exerciciorest")
public class ExercicioRest {

	// get para puxar todas os exercicios no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Exercicio> listarExercicios() {
		ExercicioDao dao = FactoryDao.createExercicioDao();
		return dao.listar();	
	}
	
	// post para cadastro de um novo exercicio.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarExercicio(Exercicio exercicio) {	
		ExercicioDao dao = FactoryDao.createExercicioDao();
		if (exercicio.getIdExercicio() < 1){
			dao.salvar(exercicio);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarExercicio(Exercicio exercicio) {
		ExercicioDao dao = FactoryDao.createExercicioDao();
		if (exercicio.getIdExercicio() > 0){
			dao.alterar(exercicio);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarExercicio(Exercicio exercicio) {
		ExercicioDao dao = FactoryDao.createExercicioDao();
		if (exercicio.getIdExercicio() > 0){
			dao.excluir(exercicio);
		}
	}
}
