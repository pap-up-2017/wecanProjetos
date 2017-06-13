package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.ItemAvaliacaoUsuario;

public class ItemAvaliacaoUsuarioDao {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();

	public void salvar(ItemAvaliacaoUsuario t){
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados 
		em.persist(t);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	public List<ItemAvaliacaoUsuario> listar(){
		// cria a Query para encontrar os itens
		Query q = em.createQuery("from ItemAvaliacaoUsuario");
		// retorna os dados encontrados
		return q.getResultList();
	}

	public ItemAvaliacaoUsuario getObjById(int id){
		// cria a Query para encontrar de acordo com o id
		Query q = em.createQuery("from ItemAvaliacaoUsuario where id = " + id);
		return (ItemAvaliacaoUsuario) q.getSingleResult();
	}

	public void alterar(ItemAvaliacaoUsuario t){
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados
		em.merge(t);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	public void excluir(ItemAvaliacaoUsuario t){
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM ItemAvaliacaoUsuario WHERE id=" + t.getId()).executeUpdate();
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
	
	public List<ItemAvaliacaoUsuario> listarNotDeleted(){
		// cria a Query para encontrar os itens
		Query q = em.createQuery("from ItemAvaliacaoUsuario WHERE isActivated= "+true);
		// retorna os dados encontrados
		return q.getResultList();
	}
}
