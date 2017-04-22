package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Notificacao;

public class NotificacaoDao {



	public void salvar(Notificacao n) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados
		em.persist(n);
		// envia os dados 
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
		
	}


	public List<Notificacao> listarPorUsuario(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para puxar os dados
		Query q = em.createQuery("from Notificacao where usuario = " + id);
		// retorna os dados encontrados
		return q.getResultList();
	}


	public Notificacao getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// Query para pesquisa via Id
		Query q = em.createQuery("from Notificacao where idNotificacao = " + id);
		return (Notificacao) q.getSingleResult();
	}

	public void alterar(Notificacao n) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados
		em.merge(n);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

	public void excluir(Notificacao n) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão
		em.createQuery("DELETE FROM Notificacao WHERE idNotificacao =" + n.getIdNotificacao()).executeUpdate();
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
	
}

	

