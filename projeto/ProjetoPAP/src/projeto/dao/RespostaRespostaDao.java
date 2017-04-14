package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.RespostaResposta;

public class RespostaRespostaDao implements InterfaceDao<RespostaResposta>{
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(RespostaResposta t) {
		// inicia a instancia
		em.getTransaction().begin();
		em.persist(t);
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<RespostaResposta> listar() {
		Query q = em.createQuery("from Resposta");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public RespostaResposta getObjById(int id) {
		// cria a Query para encontrar os estados de acordo com o id
		Query q = em.createQuery("from RespostaResposta where id = " + id);
		return (RespostaResposta) q.getSingleResult();
	}

	@Override
	public void alterar(RespostaResposta t) {
		// inicia a instancia
		em.getTransaction().begin();
		em.merge(t);
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(RespostaResposta t) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM RespostaResposta WHERE id=" + t.getIdRespostaResposta()).executeUpdate();
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

}
