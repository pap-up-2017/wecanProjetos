package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Tarefa;

public class TarefaDao implements InterfaceDao<Tarefa>{

	@Override
	public void salvar(Tarefa t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da tarefa
		em.persist(t);
		// envia os dados da tarefa
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

	@Override
	public List<Tarefa> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as tarefa
		Query q = em.createQuery("from Tarefa");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Tarefa getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as tarefa de acordo com o id
		Query q = em.createQuery("from Tarefa where id = " + id);
		return (Tarefa) q.getSingleResult();
	}

	@Override
	public void alterar(Tarefa t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da tarefa
		em.merge(t);
		// envia os dados da tarefa	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Tarefa t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Tarefa WHERE id=" + t.getIdTarefa()).executeUpdate();
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
