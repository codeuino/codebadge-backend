<template>
<div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
        </b-card-text>

      <b-button variant="primary">Go somewhere</b-button>
    </b-card-body>
    </b-card>
    </div>
</template>
<script>
export default {
  name: "CreateBadge"
};
</script>
