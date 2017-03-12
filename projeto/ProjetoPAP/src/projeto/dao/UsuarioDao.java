package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.Usuario;
import projeto.util.Criptografia;

public class UsuarioDao implements InterfaceDao<Usuario>{

	@Override
	public void salvar(Usuario u) {
		// criptografa a senha para o padrão MD5
		u.setSenhaUsuario(Criptografia.criptografar(u.getSenhaUsuario()));
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados 
		em.persist(u);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<Usuario> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar os dados no banco
		Query q = em.createQuery("from Usuario");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Usuario getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para pesquisa de acordo com o ID
		Query q = em.createQuery("from Usuario where id = " + id);
		return (Usuario) q.getSingleResult();
	}

	@Override
	public void alterar(Usuario u) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados
		em.merge(u);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Usuario u) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Usuario WHERE id=" + u.getIdUsuario()).executeUpdate();
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

}
