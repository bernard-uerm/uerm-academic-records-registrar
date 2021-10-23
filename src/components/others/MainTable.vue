<template>
  <div>
    <q-table
      dense
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :data="requestData"
      :columns="columns"
      row-key="categoryIDNumber"
      :filter="filter"
      selection="single"
      :selected.sync="selected"
      :loading="loading"
      style=" max-height: 415px; overflow-y:auto;"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search" :autofocus="true">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-toggle v-model="props.selected" checked-icon="add" icon-color="secondary" color="secondary" unchecked-icon="remove" />
          </q-td>
          <q-td key="ReferenceNumber" :props="props">
            {{ props.row.ReferenceNumber }}
          </q-td>
          <q-td key="fullName" :props="props">
            {{ props.row.fullName }}
          </q-td>
          <q-td key="RequestingDocument" :props="props">
            {{ props.row.RequestingDocument }} - ({{ props.row.DocumentCopies}} Copies)
          </q-td>
          <q-td key="ContactNumber" :props="props">
            {{ props.row.ContactNumber }}
          </q-td>
          <q-td key="DateTimeCreated" :props="props">
            {{ props.row.DateTimeCreated }}
          </q-td>
          <q-td key="Status" :props="props">
              <q-chip
                text-color="grey-8"
                icon="rule_folder"
                color="yellow"
                v-if="props.row.Status === 1"
              >
                UNVERIFIED
              </q-chip>
              <q-chip
                text-color="white"
                icon="drive_file_move"
                color="positive"
                
                v-else-if="props.row.Status === 2"
              >
                VERIFIED
              </q-chip>

              <q-chip
                text-color="white"
                icon="local_shipping"
                color="orange"
                v-if="props.row.Status === 3"
              >
                IN-TRANSIT
              </q-chip>
              <q-chip
                text-color="white"
                icon="local_post_office"
                color="blue"
                v-else-if="props.row.Status === 4"
              >
                DELIVERED
              </q-chip>
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </div>
</template>


<script>
export default {
  name: 'MainTable',
  props: ['loading', 'requestData'],
  data () {
    return {
      selected: [],
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: 'ReferenceNumber',
          label: 'Reference Number',
          align: 'left',
          field: 'ReferenceNumber',
          sortable: true
        },
        { name: 'fullName', align: 'left', label: 'Name', field: 'fullName', sortable: true },
        { name: 'RequestingDocument', label: 'Document', field: 'RequestingDocument', align: 'left', sortable: true },
        { name: 'ContactNumber', label: 'Contact #', field: 'ContactNumber', align: 'left', sortable: true },
        { name: 'DateTimeCreated', label: 'D/T Requested', field: 'DateTimeCreated', align: 'left', sortable: true },
        { name: 'Status', label: 'Status', field: 'Status', align: 'center', sortable: true }
      ],
      
    }
  },
  watch: {
    selected (val) {
      if (val.length > 0) {

      }
    }
  }
}

</script>
