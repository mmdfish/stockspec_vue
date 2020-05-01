<template>
  <div>
  <el-row :gutter="10">
    <el-col :span="4">贝塔系数(年)</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'beta_y', order:'asc', abs:true}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'beta_y', order:'desc', abs:true}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">贝塔系数(月)</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'beta_m', order:'asc', abs:true}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'beta_m', order:'desc', abs:true}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">相关性(年)</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'corr_y', order:'asc'}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'corr_y', order:'desc'}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">相关性(月)</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'corr_m', order:'asc'}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'corr_m', order:'desc'}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">5日振幅</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_5', order:'asc'}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_5', order:'desc'}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">10日振幅</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_10', order:'asc'}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_10', order:'desc'}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">20日振幅</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_m', order:'asc'}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_m', order:'desc'}}">最大</router-link></el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="4">365日振幅</el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_y', order:'asc'}}">最小</router-link></el-col>
    <el-col :span="4"><router-link :to="{ path: 'stockspec', query: {specname: 'amplitude_y', order:'desc'}}">最大</router-link></el-col>
  </el-row>
  </div>
</template>

