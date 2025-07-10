package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json.Json
import play.filters.csrf._

/** This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject() (cc: ControllerComponents)
    extends AbstractController(cc) {

  /** Create an Action to render an HTML page.
    *
    * The configuration in the `routes` file means that this method will be
    * called when the application receives a `GET` request with a path of `/`.
    */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def explore() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.explore())
  }

  def tutorial() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.tutorial())
  }

  def todo() = Action { implicit request: Request[AnyContent] =>
    val todos = models.Todo.getAll
    Ok(views.html.todo(todos))
  }

  def version() = Action { implicit request: Request[AnyContent] =>
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

  def toggleComplete(id: String) = Action { implicit request: Request[AnyContent] =>
    models.Todo.toggleComplete(id) match {
      case Some(_) => Redirect(routes.HomeController.todo())
      case None => NotFound("Todo item not found")
    }
  }

  def createTodo() = Action { implicit request: Request[AnyContent] =>
    val formData = request.body.asFormUrlEncoded.getOrElse(Map.empty)
    val title = formData.get("title").flatMap(_.headOption).getOrElse("")
    val description = formData.get("description").flatMap(_.headOption).filter(_.nonEmpty)

    if (title.nonEmpty) {
      models.Todo.create(title, description)
    }

    Redirect(routes.HomeController.todo())
  }

}
