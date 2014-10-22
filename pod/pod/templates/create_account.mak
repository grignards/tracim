<%inherit file="local:templates.master_anonymous"/>
<%namespace name="POD" file="pod.templates.pod"/>

<%def name="title()">
  pod :: ${_('Create account')}
</%def>

<div class="row">
  <div class="span10 offset1">
    <div class="row">
      <div class="span10">
        <div class="well">
          <h1>pod <small>Simple tool, flexible data.</small></h1>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">
  ${POD.SignUpForm('16em')}
</div>
