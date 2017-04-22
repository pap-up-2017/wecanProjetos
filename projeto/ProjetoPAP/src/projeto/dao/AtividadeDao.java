package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Atividade;

public class AtividadeDao {


	public void salvar(Atividade a) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da atividade
		em.persist(a);
		// envia os dados da atividade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}


	public List<Atividade> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as tarefa
		Query q = em.createQuery("from Atividade");
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	public List<Atividade> listarPorDisciplina(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as atividade
		Query q = em.createQuery("from Tarefa where disciplina_idDisciplina = "+ id);
		// retorna os dados encontrados
		return q.getResultList();
	}



	public Atividade getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontra a atividade de acordo com o id
		Query q = em.createQuery("from Atividade where idAtividade = " + id);
		return (Atividade) q.getSingleResult();
	}


	public void alterar(Atividade a) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da atividade
		em.merge(a);
		// envia os dados da tarefa	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(Atividade a) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Atividade WHERE idAtividade=" + a.getIdAtividade()).executeUpdate();
		// envia os dados do atividade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
