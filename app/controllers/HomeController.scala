package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json.Json
import play.filters.csrf._
import models.TodoService
import scala.concurrent.{ExecutionContext, Future}

/** This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject() (
    cc: ControllerComponents,
    todoService: TodoService
)(implicit ec: ExecutionContext)
    extends AbstractController(cc) {

  /** Create an Action to render an HTML page.
    *
    * The configuration in the `routes` file means that this method will be
    * called when the application receives a `GET` request with a path of `/`.
    */
  def index(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def explore(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.explore())
  }

  def tutorial(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.tutorial())
  }

  def todo(): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    todoService.getAllTodos.map { todos =>
      Ok(views.html.todo(todos))
    }
  }

  def version(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(
      Json.obj(
        "name" -> BuildInfo.name,
        "version" -> BuildInfo.version,
        "scalaVersion" -> BuildInfo.scalaVersion,
        "sbtVersion" -> BuildInfo.sbtVersion,
        "buildTime" -> BuildInfo.buildTime
      )
    )
  }

  def toggleComplete(id: String): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    todoService.toggleTodoCompletion(id).map {
      case Right(_) => Redirect(routes.HomeController.todo())
      case Left(errorMessage) => NotFound(errorMessage)
    }
  }

  def createTodo(): Action[AnyContent] = Action.async { implicit request: Request[AnyContent] =>
    val formData = request.body.asFormUrlEncoded.getOrElse(Map.empty)
    val title = formData.get("title").flatMap(_.headOption).getOrElse("")
    val description = formData.get("description").flatMap(_.headOption).filter(_.nonEmpty)

    todoService.createTodo(title, description).map {
      case Right(_) => Redirect(routes.HomeController.todo())
      case Left(errorMessage) =>
        // エラーメッセージをフラッシュスコープに保存して、リダイレクト先で表示できるようにする
        Redirect(routes.HomeController.todo()).flashing("error" -> errorMessage)
    }
  }

}
