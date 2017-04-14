package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.Feed;

public class FeedDao implements InterfaceDao<Feed> {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(Feed t) {
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da disciplina
		em.persist(t);
		// envia os dados da disciplina
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<Feed> listar() {
		// cria a Query para encontrar os Feeds
		Query q = em.createQuery("from Feed");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Feed getObjById(int id) {
		// cria a Query para encontrar a Feed de acordo com o id
		Query q = em.createQuery("from Feed where id = " + id);
		return (Feed) q.getSingleResult();
	}

	@Override
	public void alterar(Feed t) {
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da disciplina
		em.merge(t);
		// envia os dados da disciplina
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Feed t) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Feed WHERE id=" + t.getIdFeed()).executeUpdate();
		// envia os dados da disciplina
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
}
