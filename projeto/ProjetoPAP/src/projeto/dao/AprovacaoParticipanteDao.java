package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.AprovacaoParticipante;
import projeto.entity.UsuarioLogado;

public class AprovacaoParticipanteDao {
	
	public void salvar(AprovacaoParticipante t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da cidade
		em.persist(t);
		// envia os dados da cidade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	public List<AprovacaoParticipante> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades
		Query q = em.createQuery("FROM AprovacaoParticipante");
		// retorna os dados encontrados
		return q.getResultList();
	}


	public AprovacaoParticipante getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades de acordo com o id
		Query q = em.createQuery("from AprovacaoParticipante where id = " + id);
		return (AprovacaoParticipante) q.getSingleResult();
	}

	public void alterar(AprovacaoParticipante t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da cidade
		em.merge(t);
		// envia os dados da cidade	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(AprovacaoParticipante t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM AprovacaoParticipante WHERE id=" + t.getId()).executeUpdate();
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();			
	}
	
	public List<AprovacaoParticipante> listarProjeto(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades
		Query q = em.createQuery("FROM AprovacaoParticipante where idProjeto = " + id);
		// retorna os dados encontrados
		return q.getResultList();
	}

}
