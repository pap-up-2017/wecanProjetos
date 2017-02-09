package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.TipoUsuario;

public class TipoUsuarioDao implements InterfaceDao<TipoUsuario>{

	@Override
	public void salvar(TipoUsuario t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados
		em.persist(t);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<TipoUsuario> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para procurar no banco..
		Query q = em.createQuery("from TipoUsuario");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public TipoUsuario getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para procurar no banco de acordo com o id
		Query q = em.createQuery("from TipoUsuario where id = " + id);
		return (TipoUsuario) q.getSingleResult();
	}

	@Override
	public void alterar(TipoUsuario t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados
		em.merge(t);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(TipoUsuario t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM TipoUsuario WHERE id=" + t.getIdTipoUsuario()).executeUpdate();
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

}
