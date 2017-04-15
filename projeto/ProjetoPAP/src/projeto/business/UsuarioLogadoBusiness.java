package projeto.business; 

import java.util.UUID;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Usuario;
import projeto.entity.UsuarioLogado;
import projeto.util.Datas;

public class UsuarioLogadoBusiness {
	
	public UsuarioLogado create(Usuario u){
		UsuarioLogado uLogged = new UsuarioLogado();
		
		uLogged.setIdUsuarioLogado(u.getIdUsuario());
		uLogged.setTipoUsuarioLogado(u.getTipoUsuario().getTipoUsuario());
		uLogged.setDataCriacao(Datas.retornaDataAtual());
		uLogged.setToken(criarToken());
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();
		dao.salvar(uLogged);
		return uLogged;
	}
	
	public UsuarioLogado renovarToken(UsuarioLogado loggedUser){
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();

		if(verificarSession(loggedUser)){
			loggedUser.setToken(criarToken());
			loggedUser.setDataCriacao(Datas.retornaDataAtual());
			dao.alterar(loggedUser);
		}
		return null;
	}
	public Boolean verificarSession(UsuarioLogado loggedUser){
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();
		UsuarioLogado loggedUserBanco = dao.getObjById(loggedUser.getId());
		
		if(loggedUserBanco != null){
			// verifica a token
			if(loggedUser.getToken().equals(loggedUserBanco.getToken())){
				// if para fazer a verificação do tempo da session
				if(loggedUser.getDataCriacao().getTime()+(Datas.getMinute()*5) == 
						Datas.retornaDataAtual().getTime()){
					return true;
				}
			}
		}
		return false;
	}
	
	public String logout(int id){
		InterfaceDao<UsuarioLogado> dao = FactoryDao.createUsuarioLogadoDao();
		try{
			dao.excluir(dao.getObjById(id));
			return "Session deletada com sucesso!";
		}catch(Exception ex){
			return "Não foi possivel deletar a session";
		}
	}
	
	// gera token
	private String criarToken(){
		String uuid = UUID.randomUUID().toString();
		return uuid;
	}
}
