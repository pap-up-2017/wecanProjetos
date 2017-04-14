package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.Resposta;

public class RespostaDao implements InterfaceDao<Resposta> {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(Resposta t) {
		// inicia a instancia
		em.getTransaction().begin();
		em.persist(t);
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<Resposta> listar() {
		Query q = em.createQuery("from Resposta");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Resposta getObjById(int id) {
		Query q = em.createQuery("from Resposta where id = " + id);
		return (Resposta) q.getSingleResult();
	}

	@Override
	public void alterar(Resposta t) {
		// inicia a instancia
		em.getTransaction().begin();
		em.merge(t);
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Resposta t) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Resposta WHERE id=" + t.getIdResposta()).executeUpdate();
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
}
