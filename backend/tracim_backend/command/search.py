import argparse

from pyramid.scripting import AppEnvironment

from tracim_backend.app_models.contents import content_type_list
from tracim_backend.command import AppContextCommand
from tracim_backend.lib.core.content import ContentApi
from tracim_backend.lib.search.search import SearchApi
from tracim_backend.models.context_models import ContentInContext


class SearchIndexCommand(AppContextCommand):
    def get_description(self) -> str:
        return "Index content into search engine"

    def get_parser(self, prog_name: str) -> argparse.ArgumentParser:
        parser = super().get_parser(prog_name)
        parser.add_argument(
            "--content_id",
            help="select a specific content_id to index",
            dest="content_id",
            required=False,
            default=None,
        )
        return parser

    def take_app_action(self, parsed_args: argparse.Namespace, app_context: AppEnvironment) -> None:
        # TODO - G.M - 05-04-2018 -Refactor this in order
        # to not setup object var outside of __init__ .
        self._session = app_context["request"].dbsession
        self._app_config = app_context["registry"].settings["CFG"]
        self.search_api = SearchApi(
            current_user=None, session=self._session, config=self._app_config
        )
        self.search_api.update_index()
        if parsed_args.content_id:
            content_api = ContentApi(
                current_user=None, session=self._session, config=self._app_config
            )
            content = content_api.get_one(
                content_id=int(parsed_args.content_id), content_type=content_type_list.Any_SLUG
            )
            content_in_context = ContentInContext(
                content, dbsession=self._session, config=self._app_config
            )
            self.search_api.index_content(content_in_context)
        else:
            print("Indexing all content")
            self.search_api.index_all_content()
            print("All content where indexed")
