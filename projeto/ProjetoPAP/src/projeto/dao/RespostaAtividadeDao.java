package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Atividade;
import projeto.entity.RespostaAtividade;

public class RespostaAtividadeDao {


	public void salvar(RespostaAtividade ra) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da respostaAtividade
		em.persist(ra);
		// envia os dados da respostaAtividade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}


	public List<RespostaAtividade> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as tarefa
		Query q = em.createQuery("from RespostaAtividade");
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	public List<RespostaAtividade> listarPorExercicio(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as respostaAtividade
		Query q = em.createQuery("from RespostaAtividade where exercicio_idexercicio = "+ id);
		// retorna os dados encontrados
		return q.getResultList();
	}



	public RespostaAtividade getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontra a atividade de acordo com o id
		Query q = em.createQuery("from RespostaAtividade where idRespostaAtividade = " + id);
		return (RespostaAtividade) q.getSingleResult();
	}


	public void alterar(RespostaAtividade ra) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da respostaAtividade
		em.merge(ra);
		// envia os dados da respostaAtividade	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(RespostaAtividade ra) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM RespostaAtividade WHERE idRespostaAtividade=" + ra.getIdRespostaAtividade()).executeUpdate();
		// envia os dados do respostaAtividade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
