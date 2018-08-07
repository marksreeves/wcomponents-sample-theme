<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ui="https://github.com/bordertech/wcomponents/namespace/ui/v1.0"
	xmlns:html="http://www.w3.org/1999/xhtml" version="2.0"
	exclude-result-prefixes="xsl ui html">
	<xsl:template match="ui:validationerrors" priority="5">
		<section id="{@id}" class="{normalize-space(concat('wc-validation-errors wc-messagebox wc-messagebox-type-error ', @class))}">
			<h1>
				<i aria-hidden="true" class="fa fa-fw fa-minus-circle"></i>
				<span>
					<xsl:text>{{#i18n}}messagetitle_error{{/i18n}}</xsl:text>
				</span>
			</h1>
			<div class="wc_messages">
				<xsl:apply-templates select="ui:error" />
			</div>
		</section>
	</xsl:template>

	<xsl:template match="ui:error" priority="5" >
		<div class="wc-message wc-error">
			<xsl:choose>
				<xsl:when test="@for">
					<a href="#{@for}">
						<xsl:apply-templates />
					</a>
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates />
				</xsl:otherwise>
			</xsl:choose>
		</div>
	</xsl:template>
</xsl:stylesheet>
