import React from 'react'
import Radium from 'radium'
import {
  BtnSwitch,
  ConfirmPopup
} from 'tracim_frontend_lib'
import { translate } from 'react-i18next'

const WorkspaceAdvancedConfiguration = props => {
  return (
    <div className='workspace_advanced-content'>
      <div className='workspace_advanced__description formBlock'>
        <div className='formBlock__title workspace_advanced__description__title '>
          {props.t('Description')}
        </div>

        <div className='formBlock__field workspace_advanced__description__text '>
          <textarea
            className='workspace_advanced__description__text__textarea'
            placeholder={props.t("Space's description")}
            value={props.description}
            onChange={props.onChangeDescription}
            rows='3'
          />
        </div>

        <div className='formBlock__bottom  workspace_advanced__description__bottom d-flex justify-content-end'>
          <button
            type='button'
            className='workspace_advanced__description__bottom__btn btn highlightBtn'
            onClick={props.onClickValidateNewDescription}
            style={{ backgroundColor: props.customColor }}
          >
            {props.t('Validate')}
          </button>
        </div>
      </div>

      <div className='formBlock workspace_advanced__delete'>
        <div className='formBlock__title workspace_advanced__delete__title'>
          {props.t('Delete space')}
        </div>

        <div className='formBlock__field workspace_advanced__delete__content'>
          <button
            className='btn outlineTextBtn primaryColorBorder primaryColorFontDarkenHover primaryColorFont nohover'
            onClick={props.onClickDeleteWorkspaceBtn}
          >
            {props.t('Delete')}
          </button>

          <div className='workspace_advanced__delete__content__warning' />
        </div>

        {(props.displayPopupValidateDeleteWorkspace &&
          <ConfirmPopup
            onConfirm={props.onClickValidatePopupDeleteWorkspace}
            onCancel={props.onClickClosePopupDeleteWorkspace}
            confirmLabel={props.t('Delete')}
          />
        )}
      </div>

      <div
        className='workspace_advanced__functionality'
        style={{ display: 'none' }}
        // Côme - 2018/09/10 - hide this div until webdav and/or visioconf is activated
      >
        <div className='workspace_advanced__functionality__title'>
          Liste des fonctionnalités
        </div>

        <div className='workspace_advanced__functionality__text'>
          Liste des fonctionnalités présentes sur Tracim que vous pouvez désactiver :
        </div>

        <ul className='workspace_advanced__functionality__list'>
          <li className='workspace_advanced__functionality__list__item'>
            <div className='item__text'>
              Calendrier de l'espace de travail :
            </div>
            <div className='item__btnswitch'>
              <BtnSwitch />
            </div>
          </li>

          <li className='workspace_advanced__functionality__list__item'>
            <div className='item__text'>
              Visioconférence :
            </div>
            <div className='item__btnswitch'>
              <BtnSwitch />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default translate()(Radium(WorkspaceAdvancedConfiguration))
