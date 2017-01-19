package projeto.dao;

import java.util.List;

// interface para padronizar a forma que os daos serão criados.
public interface InterfaceDao<T> {
	public void salvar(T t);
	public List<T> listar();
	public T getObjById(Long id);
}
